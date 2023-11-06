export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading questions...</p>
    </div>
  );
}

// export default function Loader() {
//   return (
//     <div className="mt-[50%] flex justify-center items-center">
//       <p className="text-lg">Loading questions...</p>
//       <div className="w-16 h-16 border-2 border-white border-t-gray-500 rounded-full animate-spin"></div>
//     </div>
//   );
// }