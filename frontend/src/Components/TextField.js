import { useEffect, useRef, useContext, useState } from 'react';
import React from 'react';
import { SaveContext, EnterContext, EditorContext, SelectedIdContext, DataContext } from '../App';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function TextField(props) {
  const HandleSave = useContext(SaveContext);
  const HandleEnter = useContext(EnterContext);
  const HandleEditor = useContext(EditorContext);
  const HandleSelect = useContext(SelectedIdContext);
  const [renderData, setRenderData] = useContext(DataContext);

  const [canUpdate, setCanUpdate] = useState(false);

  const editor = useEditor({
    onCreate: editor => {
      //used to generate array of editor references for rendering menus.
      HandleEditor(editor, props.id);
    },
    onFocus: ({ editor }) => {
      //tells menu renderer to show the editor i'm currently using.
      HandleSelect(props.id);
      setCanUpdate(true);

      editor.setOptions({
        editorProps: {
          attributes: {
            canUpdate: true,
          },
        },
      });

      // console.log(editor)
    },
    onUpdate: ({ editor }) => {
      // console.log('onUpdate');
      handleUpdate({ id: props.id, value: editor.getJSON() });

      // console.log(editor)
    },
    onTransaction({ editor, transaction }) {
      if (editor.options.editorProps.attributes.canUpdate == false) {
        return;
      }

      // console.log("this ran")

      //run this if on a newline at position 0
      if (transaction.curSelection.$head.parentOffset == 0 && transaction.curSelection.head != 1) {
        //grabs stuff from next line
        let restOfLine = editor.getJSON().content[1].content?.[0].text;
        //delete the line
        editor.chain().selectNodeForward().deleteNode('paragraph').setTextSelection(2).run();

        // console.log(editor.getJSON())
        // console.log(restOfLine)

        //create new TextField component
        // console.log(props);
        HandleEnter({ id: props.id, value: restOfLine });
      }
    },
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        canUpdate: false,
      },
    },
    content: props.content,
  });

  const handleUpdate = ({ id, value }) => {
    const newItems = recursion(renderData, id, value);
    setRenderData(newItems);
  };

  //a function where you pass in an array and loop through each component checking if the ID matches.
  //in the same function, if you encounter a accordion, call itself and put that acc's array into it.
  //If no accord can be found, break out of function and continue to loop through arrays.
  const recursion = (array, id, value) => {
    const temp = array; //maybe do the json hack here?

    temp.forEach(component => {
      //if found matching ID
      if (component.id === id) {
        //update changes
        component.Content = value;
      }

      //if i encounter an accordion, e.g. an array: loop through it.
      if (component.ComponentType === 'Accordion') {
        recursion(component.Content, id, value);
      }
    });

    return temp;

    // console.log('temp', temp);
  };

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
}
