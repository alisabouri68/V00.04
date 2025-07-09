import { StickyContainer } from 'react-sticky';
function Index({ children }: any) {
    return (

        <StickyContainer className="w-full h-full rounded-xl my-custom-card">
            {children}

            {/* 
            Example Sticky Component Usage (commented out)
            <Sticky topOffset={80}>
                {({ style }) => (
                    <div style={style} className="">
                        <div className="w-full flex justify-start flex-col gap-2">
                            {children}
                        </div>
                    </div>
                )}
            </Sticky> 
            */}
        </StickyContainer>
    );
}

export default Index;
