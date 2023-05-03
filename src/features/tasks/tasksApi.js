import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () =>
                "/tasks",
        }),
        getTask: builder.query({
            query: (id) =>
                `/tasks/${id}`,
        }),
        addTask: builder.mutation({
            query: (data) => ({
                url: "/tasks",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: newTask } = await queryFulfilled;
                    //pessimistic cache update
                    if (newTask?.id) {
                        dispatch(apiSlice.util.updateQueryData(
                            "getTasks", undefined,
                            (draft) => {
                                draft.push(newTask);
                            }
                        ));
                    }
                } catch (error) {

                }
            },
        }),
        editTask: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const { data: editedTask } = await queryFulfilled;
                    //pessimistic cache update
                    if (editedTask?.id) {
                        dispatch(apiSlice.util.updateQueryData(
                            "getTasks", undefined,
                            (draft) => {
                                draft.map(x => {
                                    if (x.id == id) {
                                        Object.assign(x, editedTask);
                                    }
                                })
                            }
                        ));

                        dispatch(apiSlice.util.updateQueryData(
                            "getTask", editedTask.id.toString(),
                            (draft) => {
                                Object.assign(draft, editedTask);
                            }
                        ));
                    }
                } catch (error) {

                }
            },
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const deleteResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getTasks",
                        undefined,
                        (draft) => {
                            draft = draft.filter(x => {
                                if (x.id == arg) {
                                    return false;
                                } else {
                                    return true;
                                }
                            });
                            return draft;
                        }
                    ));
                try {
                    await queryFulfilled;
                } catch {
                    deleteResult.undo()
                }
            }
        })
    }),
});

export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useAddTaskMutation,
    useEditTaskMutation,
    useDeleteTaskMutation } = tasksApi;
