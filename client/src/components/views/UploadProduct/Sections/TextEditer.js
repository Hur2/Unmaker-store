import React from "react";
import classNames from "classnames/bind";

// imports for summernote
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import Axios from "axios";

class TextEditer extends React.Component {
  onChange = content => {
    this.props.onChangefunction(content)
    console.log(content)
  };

  onImageUpload = (images, insertImage) => {

    let formData = new FormData();
    let url=null;
    const config = {
            header: { 'content-type': 'multipart/form-data'}
        }
    formData.append("file", images[0])

    Axios.post('/api/product/image', formData, config)
      .then(response => {
          if(response.data.success) {
            console.log(response.data)
            url=`http://localhost:5000/${response.data.filePath}`
            insertImage(url)     
          } else {
              alert("이미지 등록 실패!")
          }
      }) 
  };

  render() {
    return (
    <ReactSummernote
        value="내용을 입력하여주세요"
        options={{
        lang: "ko-KR",
        height: 380,
        dialogsInBody: true,
        toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "underline", "clear"]],
            ["fontname", ["fontname"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["table", ["table"]],
            ["insert", ["link", "picture", "video"]],
            ["view", ["fullscreen", "codeview"]]
        ]
        }}
        onChange={this.onChange}
        onImageUpload={this.onImageUpload}
    />
    );
  }
}

export default TextEditer
