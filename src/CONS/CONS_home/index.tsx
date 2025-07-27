import { Suspense } from "react";
import HomeDesk from "../../LAYOUT/LAYO_Cover_desk_V00.04"
import HomeMobile from "../../LAYOUT/LAYO_Cover_mobile_V00.04"
const index = () => {
    const SuspenseFallback = () => <div>Loading...</div>;
    function ResponsiveLayout() {
        const isMobile = window.innerWidth < 768;
        const Layout = isMobile ? HomeMobile : HomeDesk;
        return (
            <Suspense fallback={<SuspenseFallback />}>
                <Layout />
            </Suspense>
        );
    }
    return (
        <>
            <ResponsiveLayout />
        </>
    )
}

export default index
