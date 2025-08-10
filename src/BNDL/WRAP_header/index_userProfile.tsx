import Avatar from "COMP/RCMP_avatar_VAR.01_V00.04";
export default function index_userProfile() {
    return (
        <div className="flex gap-2">
            <div>
                <Avatar alt="user" fallbackText="" />
            </div>
            <div className="flex flex-col items-start">
                <div className="hidden lg:flex"><span >Hana Rezaei</span></div>
                <div className="hidden lg:flex"><span >Tehran</span></div>
            </div>
        </div>
    )
}
