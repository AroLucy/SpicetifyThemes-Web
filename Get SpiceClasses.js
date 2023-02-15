function getAllXPathsAndClassNames() {
  const elements = document.getElementsByTagName("*"); // Get all elements on the page
  const results = [];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const xpath = getXPathForElement(element); // Get the XPath for the element
    const classes = Array.from(element.classList); // Get the classes for the element

    results.push({
      xpath: xpath,
      classes: classes,
    });
  }

  return results;
}

function getXPathForElement(element) {
  const idx = (sib, name) =>
    sib
      ? idx(sib.previousElementSibling, name || sib.localName) +
        (sib.localName == name)
      : 1;
  const segs = (elm) =>
    !elm || elm.nodeType !== 1
      ? [""]
      : elm.id && document.getElementById(elm.id) === elm
      ? [`id("${elm.id}")`]
      : [
          ...segs(elm.parentNode),
          `${elm.localName.toLowerCase()}[${idx(elm)}]`,
        ];
  return segs(element).join("/");
}
getAllXPathsAndClassNames();
