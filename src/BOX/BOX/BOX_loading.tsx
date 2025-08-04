// import { LifeLine } from 'react-loading-indicators';
import logo from "../ASST/images/logo-dash.svg"
// Separate fallback component for better readability and performance
const BOX_loading = () => (

    <div className="w-screen h-screen flex flex-col items-center justify-center gap-5 my-custom-card">
        <img src={logo} alt="" width={100} height={100} />
        {/* <LifeLine color="rgb(var(--color-primary))" size="large" /> */}
    </div>
);

export default BOX_loading;
