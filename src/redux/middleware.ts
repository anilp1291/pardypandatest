import axios from "axios";
import * as actions from "./api";

const middleware =
    ({ dispatch }) =>
        (next) =>
            async (action) => {
                if (action.type !== actions.apiCallBegan.type) return next(action);

                const { url, method, data, onStart, onSuccess, onError } =
                    action.payload;

                if (onStart) dispatch({ type: onStart });

                next(action);

                try {
                    const response = await axios.request({
                        baseURL: "https://gist.githubusercontent.com/aclement-ikarusdev/5dd618bf13ac76cebfa08c0e3c99b677/raw/e6b13ac3f7f9ad174209cbb30f331427ab6f7fb5",
                        url,
                        method,
                        data,
                    });
                    // General
                    dispatch(actions.apiCallSucess(response.data));
                    // Specific
                    if (onSuccess)
                        dispatch({ type: onSuccess, payload: response.data });
                } catch (error) {
                    // General
                    dispatch(actions.apiCallFailed(error.message));
                    // Specific
                    if (onError) dispatch({ type: onError, payload: error.message });
                }
            };

export default middleware;