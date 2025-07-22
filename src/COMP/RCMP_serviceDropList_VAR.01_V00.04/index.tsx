import { ServiceItem } from "COMP/RCMP_TEST"
import Text from "COMP/RCMP_text_VAR.01_v00.04"
function index({ allServices, selectItem, setSelectItem, startIndex, endIndex, services }: { allServices: ServiceItem[], selectItem: string, setSelectItem: (id: string) => void, startIndex: number, endIndex: number, services: ServiceItem[] }) {

    return (
        <div className="absolute top-10 right-20 w-52 flex flex-col items-center text-text-light-custom h-64 overflow-y-auto">
            <div className="flex flex-col w-full border border-text-light-custom rounded-md overflow-hidden bg-white overflow-y-auto custom-scrollbar">
                {allServices && allServices.map((start, index) => {
                    if (index < startIndex) {
                        return (
                            <div onClick={() => setSelectItem(start.id)} className={`${selectItem === start.id ? "border-s-primary" : ""} flex items-center justify-evenly py-1 border-4 border-transparent shadow-sm hover:bg-gray-100 duration-300 cursor-pointer`}>
                                <Text size="xs" as="span" >{start.icon}</Text>
                                <Text size="xs" as="span" >{start.title}</Text>
                            </div>
                        )
                    }
                    return null
                })}
                <div className="border-2 border-primary rounded-lg">
                    {services && services.map(item => {
                        return (
                            <div onClick={() => setSelectItem(item.id)} className={`${selectItem === item.id ? "border-s-primary" : ""} flex items-center justify-evenly py-1 border-4 border-transparent shadow-sm hover:bg-gray-100 duration-300 cursor-pointer`}>
                                <Text size="xs" as="span" >{item.icon}</Text>
                                <Text size="xs" as="span" >{item.title}</Text>
                            </div>
                        )
                    })}
                </div>
                {allServices && allServices.map((end, index) => {
                    if (index > endIndex) {
                        return (
                            <div onClick={() => setSelectItem(end.id)} className={`${selectItem === end.id ? "border-s-primary" : ""} flex items-center justify-evenly py-1 border-4 border-transparent shadow-sm hover:bg-gray-100 duration-300 cursor-pointer`}>
                                <Text size="xs" as="span" >{end.icon}</Text>
                                <Text size="xs" as="span" >{end.title}</Text>
                            </div>
                        )
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default index
