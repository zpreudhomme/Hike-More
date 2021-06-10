const SET_HIKES = "hike/SET_HIKES"

const setHikes = (hikes) => ({
    type: SET_HIKES,
    payload: hikes
})

const initialState = { hikes: null };

export const addAllHikes = () => async dispatch => {
    console.log("inside where I want to be")
    const response = await fetch('/api/hike/')

    const data = await response.json()
    if (data.errors){
        return data.errors
    }

    dispatch(setHikes(data))
}

export const getHike = async (id) => {
    console.log("individual hike")
    const response = await fetch(`/api/hike/${id}`)

    const data = await response.json()
    if (data.errors){
        return data.errors
    }
    return data
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case SET_HIKES:
            return {hikes: action.payload.hike}
        default:
            return state;
    }
}