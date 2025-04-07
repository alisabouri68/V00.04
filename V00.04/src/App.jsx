import Sidebar from './components/Sidebar';

export default function App() {
    return ( <
        div className = "flex min-h-screen bg-black" >
        <
        Sidebar / >
        <
        div className = "flex-1 p-8" >
        <
        h1 className = "text-2xl font-bold text-white" > </h1> </div>
        </div>
    );
}

// export default function App() {
//     return (
//       <div className="dark:bg-gray-800  min-h-screen flex justify-center items-center">
//         <h1 className="text-3xl font-bold text-white">Test Tailwind</h1>
//       </div>
//     );
// }