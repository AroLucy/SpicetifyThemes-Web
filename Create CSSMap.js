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
  
  function MapXpathClasses(obj1, obj2) {
    const xpaths1 = obj1.map((elem) => elem.xpath);
    const classes1 = obj1.map((elem) => elem.classes);
  
    const xpaths2 = obj2.map((elem) => elem.xpath);
    const classes2 = obj2.map((elem) => elem.classes);
  
    const CSSMapObject = [];
    let index = 0;
  
    for (let i = 0; i < xpaths1.length; i++) {
      for (let j = 0; j < xpaths2.length; j++) {
        if (xpaths1[i] === xpaths2[j]) {
          CSSMapObject[index] = { classes1: classes1[i], classes2: classes2[j] };
          index++;
        }
      }
    }
  
    return CSSMapObject;
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
  
  function convertClasses(input) {
    let output = {};
    input.forEach(obj => {
      obj.classes1.forEach((class1, index) => {
        output[class1] = obj.classes2[index];
      });
    });
    return output;
  }
  function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }
  
  function CreateCSSMap(SpiceClientObj) {
    getElementByXpath('/html/body/div[4]/div/div[2]/nav/div[1]/div[1]').remove()
    getElementByXpath('/html/body/div[4]/div/div[2]/nav/div[1]/div[2]').remove()
    WebClientObj = getAllXPathsAndClassNames() 
    MixedObj = MapXpathClasses(WebClientObj, SpiceClientObj)
    CSSMap = convertClasses(MixedObj)
    return CSSMap
  }