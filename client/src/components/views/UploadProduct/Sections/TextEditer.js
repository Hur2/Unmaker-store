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

class TextEditer extends React.Component {
  onChange = content => {
    this.props.onChangefunction(content)
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
    />
    );
  }
}

export default TextEditer
