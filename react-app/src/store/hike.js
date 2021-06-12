const SET_HIKES = "hike/SET_HIKES"

const setHikes = (hikes) => ({
    type: SET_HIKES,
    payload: hikes
})

const initialState = { hikes: null };

export const addAllHikes = () => async dispatch => {
    const response = await fetch('/api/hike/')

    const data = await response.json()
    if (data.errors){
        return data.errors
    }

    dispatch(setHikes(data))
}

export const getHike = async (id) => {
    const response = await fetch(`/api/hike/${id}`)

    const data = await response.json()
    if (data.errors){
        return data.errors
    }
    return data
}

export const deleteHike = (id) => async dispatch => {
    console.log("Where I want to be")
    const response = await fetch(`/api/hike/${id}`, {
        method: 'DELETE',
    })
    console.log("finished")
    const data = await response.json()
    return data;
}

export const editHike = (id, name, latitude, longitude, description, photo, state_id) => async () => {
    const response = await fetch(`/api/hike/${id}`, {
        method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        latitude,
        longitude,
        description,
        photo,
        state_id
      })
    })

    const data = await response.json()
    return data;
}

export const createHike = (name, latitude, longitude, description, photo, state_id) => async () => {
    const response = await fetch('/api/hike/', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        latitude,
        longitude,
        description,
        photo,
        state_id
      })
    })
    
    const data = await response.json()
    return data
}

export const favoriteHikes = () => async () => {
    const response = await fetch('/api/hike/favorites')

    const data = await response.json();
    return data;
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case SET_HIKES:
            return {hikes: action.payload.hike}
        default:
            return state;
    }
}