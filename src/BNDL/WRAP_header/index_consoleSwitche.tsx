import ConsoleSwitche from "../../COMP/RCMP_consoleSwitcher_VAR.01_V00.04";

export default function index_consoleSwitche({ console }: { console?: string }) {
    return (
        <>
            <ConsoleSwitche console={console} />
        </>
    )
}
