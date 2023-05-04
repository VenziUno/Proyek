import axios from "axios";
import React, { useEffect, useState } from "react";

function Todo({ data }) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const submitFrom = (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("title", title);
    formData.append("is_done", 0);
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/todos`;
    if (todoId !== "") {
      url = `${process.env.NEXT_PUBLIC_API_URL}/api/todos/` + todoId;
      formData.append("_method", "PUT");
    }
    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjgzMjA4NDQwLCJleHAiOjE2ODMyMTIwNDAsIm5iZiI6MTY4MzIwODQ0MCwianRpIjoiVVZKd1NSdHN5TGlqUTlURCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.eWvFvuHVNAIop_dAjdmpthaw4Sh4pUy3LA3c39QdX3I`,
        },
      })
      .then((response) => {
        setTitle("");
        fetchTodos();
        setTodoId("");
      });
  };

  function editTodo(id) {
    setTodoId(id);
    todos.map((item) => {
      if (item.id == id) {
        setTitle(item.title);
      }
    });
  }

  function fetchTodos() {
    // setTodos(data)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`, {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjgzMjA4NDQwLCJleHAiOjE2ODMyMTIwNDAsIm5iZiI6MTY4MzIwODQ0MCwianRpIjoiVVZKd1NSdHN5TGlqUTlURCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.eWvFvuHVNAIop_dAjdmpthaw4Sh4pUy3LA3c39QdX3I`,
        },
      })
      .then((response) => {
        setTodos(response.data);
      });
  }

  function deleteTodo(id) {
    let params = { _method: "delete" };
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/` + id, params ,{
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjgzMjA4NDQwLCJleHAiOjE2ODMyMTIwNDAsIm5iZiI6MTY4MzIwODQ0MCwianRpIjoiVVZKd1NSdHN5TGlqUTlURCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.eWvFvuHVNAIop_dAjdmpthaw4Sh4pUy3LA3c39QdX3I`,
        },
      })
      .then((response) => {
        setTitle("");
        fetchTodos();
        setTodoId("");
      });
  }

  return (
    <div className="w-full h-screen justify-center items-center m-auto flex">
      <div className="space-y-4 m-4">
        <form className="mt-3" method="POST" onSubmit={submitFrom}>
          <div className="space-y-2">
            <h1 className="flex justify-center font-bold text-3xl">TODO APP</h1>
            <div className="flex space-x-2">
              <input
                type="text"
                className="border shadow px-2 py-2 rounded w-96 border-slate-400"
                placeholder="Type..."
                value={title}
                onChange={titleChange}
              />
              <div>
                <button
                  type="submit"
                  className="border shadow px-4 py-2 rounded bg-blue-300 hover:bg-blue-500"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </form>
        <table className="border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th className="border-collapse border border-slate-400 px-6 py-3 uppercase">
                no.
              </th>
              <th className="border-collapse border border-slate-400 px-6 py-3 w-full uppercase">
                Title
              </th>
              <th className="border-collapse border border-slate-400 px-6 py-3 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todos &&
              todos.map((data, i) => {
                return (
                  <tr key={i}>
                    <th className="border-collapse border border-slate-400 px-6 py-3">
                      {i + 1}
                    </th>
                    <th className="border-collapse border border-slate-400 px-6 py-3">
                      {data.title}
                    </th>
                    <th className="border-collapse border border-slate-400 px-2 ">
                      <div className="space-x-2 flex">
                        <button
                          className="border shadow px-4 py-2 rounded bg-yellow-300 hover:bg-yellow-500"
                          onClick={() => editTodo(data.id)}
                        >
                          EDIT
                        </button>
                        <button
                          className="border shadow px-4 py-2 rounded bg-red-300 hover:bg-red-500"
                          onClick={() => deleteTodo(data.id)}
                        >
                          DELETE
                        </button>
                      </div>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   try {
//     // Membuat permintaan GET ke API backend
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL_SSR}/api/todos`
//     );
//     const data = response.data;

//     // Mengembalikan data yang dimuat sebagai props
//     return {
//       props: {
//         data,
//       },
//     };
//   } catch (error) {
//     // Menangani kesalahan saat mengirimkan permintaan
//     console.error(error);

//     // Mengembalikan objek kosong sebagai props jika terjadi kesalahan
//     return {
//       props: {},
//     };
//   }
// }

export default Todo;
