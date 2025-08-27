

/******************************************
AssetID:    	ActorGrp.2
AssetTitle:    	Actor Dyna Manager -scriptGroup-2 
Version:        V00.04

Last Update:    2025.08.22
By:             APPS.00

Description:  This templates is used for developing React Actors based on V00.04
******************************************/








	// Script Group 2


// Initial state
const initialState = DEFAULT_GLOBAL_STATE

// Create Dynaman instance
const dynaman = new Dynaman();

// Load initial state from localStorage if available
const savedState = dynaman.init();
const initialGlobalState = savedState ? { ...initialState, ...savedState } : initialState;

const globalStateSlice = createSlice({
  name: 'globalState',
  initialState: initialGlobalState,
  reducers: {
    updateState: (state, action: PayloadAction<Partial<typeof initialState>>) => {
      // Update state
      Object.assign(state, action.payload);
      
      // Save to localStorage
      dynaman.reconfig(state);
    },
    resetState: (state) => {
      // Reset to default
      Object.assign(state, initialState);
      
      // Save to localStorage
      dynaman.reconfig(state);
    }
  }
});


export const { updateState, resetState } = globalStateSlice.actions;
export default globalStateSlice.reducer;





