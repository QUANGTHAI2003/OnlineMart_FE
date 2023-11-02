import { Editor } from "@tinymce/tinymce-react";
import { FC, useCallback, useEffect, useState } from "react";

interface IRichTextProps {
  onChange: (content: string) => void;
  initValue?: string;
}

const API_KEY = import.meta.env.VITE_TINYMCE_API_KEY as string;

const RichText: FC<IRichTextProps> = ({ onChange, initValue }) => {
  const [key, setKey] = useState<number>(0);

  const handleEditorChange = useCallback(
    (content: string) => {
      onChange(content);
    },
    [onChange]
  );

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <Editor
      apiKey={API_KEY}
      id="editor"
      key={key}
      initialValue={initValue}
      init={{
        plugins:
          "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
        imagetools_cors_hosts: ["picsum.photos"],
        menubar: "file edit view insert format tools table help",
        toolbar:
          "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: "30s",
        autosave_prefix: "{path}{query}-{id}-",
        autosave_restore_when_empty: false,
        autosave_retention: "2m",
        image_advtab: true,
        content_css: "//www.tiny.cloud/css/codepen.min.css",
        link_list: [
          { title: "My page 1", value: "http://www.tinymce.com" },
          { title: "My page 2", value: "http://www.moxiecode.com" },
        ],
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default RichText;
