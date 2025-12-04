

// src/utils/postUtils.ts





export const extractFirstImageUrl = (htmlContent: string): string | null => {


  const parser = new DOMParser();


  const doc = parser.parseFromString(htmlContent, 'text/html');


  const imgTag = doc.querySelector('img');


  return imgTag ? imgTag.src : "/noImage.jpg";


};





export const getPlainTextSummary = (htmlContent: string, maxLength: number = 150): string => {


  const parser = new DOMParser();


  const doc = parser.parseFromString(htmlContent, 'text/html');


  


  let plainText = '';


  // Iterate through child nodes to preserve line breaks from block elements


  doc.body.childNodes.forEach(node => {


    if (node.nodeType === Node.TEXT_NODE) {


      plainText += node.textContent;


    } else if (node.nodeType === Node.ELEMENT_NODE) {


      const element = node as HTMLElement;


      // Remove img tags completely for summary


      if (element.tagName.toLowerCase() === 'img') {


        return; 


      }


      plainText += element.textContent;


      // Add a newline for block-level elements


      if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'].includes(element.tagName.toLowerCase())) {


        plainText += '\n';


      }


    }


  });





  // Clean up multiple newlines and trim whitespace


  plainText = plainText.replace(/(\n\s*){2,}/g, '\n\n').trim();





  if (plainText.length > maxLength) {


    return plainText.substring(0, maxLength) + '...';


  }


  return plainText;


};



