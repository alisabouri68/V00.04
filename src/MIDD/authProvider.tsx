import Container from "../COMP/RCOM_container"
import Navigation from "../BOX/BOX_nav"
import Header from "../BOX/BOX_headerr"
import { type RoutsType } from '../TYPE/index'
interface Props {
    route: RoutsType
}
const AuthProvider = ({ route }: Props) => {
    const { layout } = route
    const shoHeader = layout?.header !== false

    const shoAside = layout?.aside !== false
    console.log("Rendering route:", route.path)
    console.log("Element:", route.element)

    return (
        <div className="flex flex-col w-full">
            {shoHeader && <Header />}
            <div className='flex w-full'>
                <Container>
                    {shoAside && <Navigation />}
                    <div className="">
                        {route.element}
                    </div>
                </Container>
            </div>

        </div>
    )
}

export default AuthProvider
