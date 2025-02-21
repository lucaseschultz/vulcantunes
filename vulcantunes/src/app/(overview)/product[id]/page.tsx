// import DOMPurify from 'isomorphic-dompurify';
//
// const SafeHTML = ({ content }) => {
//   const sanitizedContent = DOMPurify.sanitize(content, {
//     ALLOWED_TAGS: ['a', 'p', 'br', 'strong', 'em', 'ul', 'li'],
//     ALLOWED_ATTR: ['href', 'target', 'rel']
//   });
//
//   return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
// };
//
// export default SafeHTML;
//
// // Usage example:
// const ProductDescription = ({ description }) => {
//   return (
//     <div className="product-description">
//       <SafeHTML className="product-description" content={description} />
//     </div>
//   );
// };