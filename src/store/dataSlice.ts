import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

type Data = {
  id: number,
  name: string,
  email: string,
  birthday_date: string,
  phone_number: string,
  address: string
};

type DataState = {
  list: Data[],
};

const initialState: DataState = {
  list: [],
};

export const fetchData = createAsyncThunk<Data[], undefined, {rejectValue: string}>(
  'data/fetchData',
  async function (_, {rejectWithValue}) {
    const response = await fetch('https://technical-task-api.icapgroupgmbh.com/api/table/');

    if(!response.ok) {
      rejectWithValue('something went wrong');
    }

    const data = await response.json();

    return data.results;
  },
);

// {id: number, field_name: keyof Data, newValue: string,}

export const editData = createAsyncThunk<Data, {id: number, field_name: keyof Data, newValue: string,}, {rejectValue: string, state: { data: DataState }} > (
  'data/editData',
  async function ({id, field_name, newValue}, {rejectWithValue, dispatch, getState}) {
    const data = getState().data.list.find(element => element.id === id);

    if(data) {
      const response = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field_name]: newValue }),
      });

      if(!response.ok) {
        return rejectWithValue('update error');
      }
      
      return (await response.json()) as Data;
    }
    return rejectWithValue('Eror data value');
  },
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  extraReducers : (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.list = action.payload;
    })
      .addCase(editData.fulfilled, (state, action) => {
        // const changedData = state.list.find( element => element.id === action.payload.id);
        // if (changedData) {
        //   changedData.
        // }

        state.list = state.list.map(element => {
          if (element.id === action.payload.id) {
            return action.payload;
          }
          return element;
        });
      });
  },
  reducers: {
    setData(state, action: PayloadAction<Data[]>) {
      state.list = action.payload;
    },
    editDatas(state, action: PayloadAction<{id: number, field_name: keyof Data, newValue: string }>) {
      const changedData = state.list.find( element => element.id === action.payload.id);
      if (changedData) {
        switch (action.payload.field_name) {
        case 'name':
          changedData.name = action.payload.newValue;
          break;
        case 'email':
          changedData.email = action.payload.newValue;
          break;
        case 'birthday_date':
          changedData.birthday_date = action.payload.newValue;
          break;
        case 'phone_number':
          changedData.phone_number = action.payload.newValue;
          break;
        case 'address':
          changedData.address = action.payload.newValue;
          break;
        }
      }
    },
  },
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
