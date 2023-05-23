import React from "react";

const FormattedTextComponent = ({ body }) => {
  const formatText = (text) => {
    let formattedText = text;

    // Apply line spacing
    formattedText = formattedText.replace(/\r\n\r\n/g, "<br/><br/>");

    // Apply heading style
    formattedText = formattedText.replace(/##\s(.+)/g, "<strong>$1</strong>");

    return formattedText;
  };

  const formattedBody = formatText(body);

  return <div dangerouslySetInnerHTML={{ __html: formattedBody }} />;
};

export default FormattedTextComponent;
