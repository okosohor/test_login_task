import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { editData, fetchData } from '../../store/dataSlice';


import './Table.scss';
interface Data {
  id: number,
  name: string,
  email: string,
  birthday_date: string,
  phone_number: string,
  address: string
};

export const Table: React.FC = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(state => state.data.list);
  const [isEditingField, setIsEditingField] = useState<string | number>('');
  const [isEditingId, setIsEditingId] = useState<number>();

  const [curretntPage, setCurrentPage] = useState(1);
  const rowPerPage = 4;

  useEffect(() => {
    dispatch(fetchData());
  },[dispatch]);

  const seleceEditing = (field: string | number, id:number) => {
    setIsEditingField(field);
    setIsEditingId(id);
  };

  const isEditing = (field_name: string, id:number) => (
    isEditingField === 'email' && isEditingId === id
  );

  const lastRowindex = curretntPage * rowPerPage;
  const firstRowIndex = lastRowindex - rowPerPage;
  const currentRow = data.slice(firstRowIndex, lastRowindex);
  const pageNumbers = [];

  for( let i = 1; i <= Math.ceil( data.length / rowPerPage); i++) {
    pageNumbers.push(i);
  };

  const handleButtonClick = (number: number) => {
    setCurrentPage(number);
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement> , id: number, field_name: keyof Data) => {

    let newValue = '';
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
      const inputElement = e.target.querySelector('input') as HTMLInputElement;
      newValue = inputElement.value; 
      if (inputElement) {
        inputElement.blur(); 
      }
    }

    dispatch(editData({id, field_name, newValue}));

    if (e.target instanceof HTMLFormElement) {
      e.target.blur();
    }

    setIsEditingField('');
    setIsEditingId(undefined);

  };
  
  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__row table__row--head">
          <th className="table__cell table__cell--head">id</th>
          <th className="table__cell table__cell--head">name</th>
          <th className="table__cell table__cell--head">email</th>
          <th className="table__cell table__cell--head">birthday date</th>
          <th className="table__cell table__cell--head">phone number</th>
          <th className="table__cell table__cell--head">address</th>
        </tr> 
      </thead>
      <tbody className="table__body">
        {data.length && currentRow.map(el => <tr key={el.id}>
          <td onDoubleClick={() => {seleceEditing('id', el.id);}} className="table__cell">
            {el.id}
          </td>
          <td onDoubleClick={() => {seleceEditing('name', el.id);}} className="table__cell">{
            isEditingField === 'name' && isEditingId === el.id ? (
              <>
                <form className="table__form table__form--is-editing" onSubmit={ (e) => handleSubmit(e , el.id, 'name')}>
                  <input size={el.name.length} className="table__input" type="text" 
                    defaultValue={el.name}/>
                  <div className={cn('table__text table__text--is-editing')}>{el.name}</div>
                </form> 
              </>
            ) : (
              <>
                <form className="table__form" onSubmit={ (e) => handleSubmit(e , el.id, 'name')}>
                  <input size={el.name.length} className="table__input" type="text" 
                    defaultValue={el.name}/>
                </form> 
                <div className={cn('table__text')}>{el.name}</div>
              </>
            )}
          </td>
          <td onDoubleClick={() => {seleceEditing('email', el.id);}} className="table__cell">{
            isEditingField === 'email' && isEditingId === el.id ? (
              <>
                <form className="table__form table__form--is-editing" onSubmit={ (e) => handleSubmit(e , el.id, 'email')}>
                  <input size={el.email.length} className="table__input" type="text" 
                    defaultValue={el.email}/>
                  <div className={cn('table__text table__text--is-editing')}>{el.email}</div>
                </form> 
              </>
            ) : (
              <>
                <form className="table__form" onSubmit={ (e) => handleSubmit(e , el.id, 'email')}>
                  <input size={el.email.length} className="table__input" type="text" 
                    defaultValue={el.email}/>
                </form> 
                <div className={cn('table__text')}>{el.email}</div>
              </>
            )}
          </td>
          <td onDoubleClick={() => {seleceEditing('birthday_date', el.id);}} className="table__cell">{
            isEditingField === 'birthday_date' && isEditingId === el.id ? (
              <>
                <form className="table__form table__form--is-editing" onSubmit={ (e) => handleSubmit(e , el.id, 'birthday_date')}>
                  <input size={el.birthday_date.length} className="table__input" type="text" 
                    defaultValue={el.birthday_date}/>
                  <div className={cn('table__text table__text--is-editing')}>{el.birthday_date}</div>
                </form> 
              </>
            ) : (
              <>
                <form className="table__form" onSubmit={ (e) => handleSubmit(e , el.id, 'birthday_date')}>
                  <input size={el.birthday_date.length} className="table__input" type="text" 
                    defaultValue={el.birthday_date}/>
                </form> 
                <div className={cn('table__text')}>{el.birthday_date}</div>
              </>
            )}
          </td>
          <td onDoubleClick={() => {seleceEditing('phone_number', el.id);}} className="table__cell">{
            isEditingField === 'phone_number' && isEditingId === el.id ? (
              <>
                <form className="table__form table__form--is-editing" onSubmit={ (e) => handleSubmit(e , el.id, 'phone_number')}>
                  <input size={el.phone_number.length} className="table__input" type="text" 
                    defaultValue={el.phone_number}/>
                  <div className={cn('table__text table__text--is-editing')}>{el.phone_number}</div>
                </form> 
              </>
            ) : (
              <>
                <form className="table__form" onSubmit={ (e) => handleSubmit(e , el.id, 'phone_number')}>
                  <input size={el.phone_number.length} className="table__input" type="text" 
                    defaultValue={el.phone_number}/>
                </form> 
                <div className={cn('table__text')}>{el.phone_number}</div>
              </>
            )}
          </td>
          <td onDoubleClick={() => {seleceEditing('address', el.id);}} className="table__cell">{
            isEditingField === 'address' && isEditingId === el.id ? (
              <>
                <form className="table__form table__form--is-editing" onSubmit={ (e) => handleSubmit(e , el.id, 'address')}>
                  <input size={el.address.length} className="table__input" type="text" 
                    defaultValue={el.address}/>
                  <div className={cn('table__text table__text--is-editing')}>{el.address}</div>
                </form> 
              </>
            ) : (
              <>
                <form className="table__form" onSubmit={ (e) => handleSubmit(e , el.id, 'address')}>
                  <input size={el.address.length} className="table__input" type="text" 
                    defaultValue={el.address}/>
                </form> 
                <div className={cn('table__text')}>{el.address}</div>
              </>
            )}
          </td>
        </tr>)}
      </tbody>
      <tfoot className="table__foot">
        <tr>
          <td colSpan={6}>
            <div className="table__navigation">
              <img src={require('./img/first.jpg')} alt="mem" className="table__mem" />
              <div className="table__navigation-button-group">
                <button 
                  onClick={() => (setCurrentPage(curretntPage - 1))} 
                  disabled={curretntPage === pageNumbers[0]} 
                  className="table__navigation-button"
                >
                  {'<'}
                </button>
                {pageNumbers.map(num => <button className={cn(
                  'table__navigation-page-button', 
                  {'table__navigation-page-button--active': num === curretntPage},
                )}  onClick={() => handleButtonClick(num)} key={num}>{num}
                </button>)}
                <button 
                  onClick={() => (setCurrentPage(curretntPage + 1))}  
                  disabled={curretntPage === pageNumbers[pageNumbers.length-1]} 
                  className="table__navigation-button"
                >
                  {'>'}
                </button>
              </div>
              <img src={require('./img/second.jpg')} alt="mem" className="table__mem" />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
