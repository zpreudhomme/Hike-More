const SET_LOCATION = "location/SET_LOCATION"

const setLocation = (location) => ({
    type: SET_LOCATION,
    payload: location
})

const initialState = {userLocation: null}

export const locateUser = (latitude, longitude) => (dispatch) => {
    const location = {latitude, longitude}
    dispatch(setLocation(location))
}

export default function reducer(state=initialState, action){
    switch(action.type) {
        case SET_LOCATION:
            return {userLocation: action.payload}
        default:
            return state
    }
}