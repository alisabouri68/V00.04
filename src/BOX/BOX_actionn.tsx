import Jini from "../BOX/BOX_Jinni"
import Auxiliary from "../BOX/BOX_auxiliary"
const BOX_actionn = () => {
    return (
        <div className="w-full h-full flex py-1">
            <div className="flex w-9/12 ps-1 overflow-x-hidden">
                <Jini />
            </div>
            <div className="flex w-3/12 px-1">
                <Auxiliary />
            </div>
        </div>
    )
}

export default BOX_actionn
