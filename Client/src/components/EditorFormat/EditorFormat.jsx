import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditorFormat({ value, onChange, placeholder }) {
    return (
        <>
            <ReactQuill
                theme="snow"
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
            />
        </>
    );
}

export default EditorFormat;
