'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Quill = _interopDefault(require('quill'));

let quill_;

function setContents(content){
  quill_.setContents(content);
}

function quill(node, options,content) {
  quill_ = new Quill(node, {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["link", "code-block"]
      ]
    },
    placeholder: "Type something...",
    theme: "snow", // or 'bubble'
    ...options
  });
  const container = node.getElementsByClassName("ql-editor")[0];

  quill_.on("text-change", function(delta, oldDelta, source) {
    node.dispatchEvent(
      new CustomEvent("text-change", {
        detail: {
          html: container.innerHTML,
          text: quill_.getText()
        }
      })
    );
  });

  if(content&&quill){
    quill_.setContents(content);
  }

}

exports.quill = quill;
exports.setContents = setContents;
