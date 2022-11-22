import React, { useState, useEffect } from 'react';
import { NewColumn } from '../columns/new-column';
import './openedboard.scss';
import { Modal } from 'components/modal/Modal';
import { AddColumn } from '../columns/addcolumn';
import { IGetState } from 'interfaces/redux';
import { useSelector } from 'react-redux';
import { IColumn } from 'interfaces/api';
import { useParams } from 'react-router-dom';
import ColumnApi from '../../../api/columns';
import { get } from 'immer/dist/internal';

const OpenedBoard = () => {
  const [isModal, setModal] = useState(false);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [numOfColumns, setnumOfColumns] = useState(false);

  const params = useParams();
  const currentBoard = params.id as string;

  useEffect(() => {
    const getColumns = async () => {
      const currentColumns = await ColumnApi.getColumnsInBoard(currentBoard);
      setColumns(currentColumns);
    };
    getColumns();
  }, [numOfColumns]);

  return (
    <>
      <section className="columns">
        <ul className="columns-table">
          {columns.map((values) => {
            return <NewColumn values={values} key={values._id} />;
          })}
          <li>
            <button className="columns-table__add" onClick={() => setModal(true)}>
              Add new column +
            </button>
          </li>
        </ul>
      </section>
      {isModal && (
        <Modal
          isVisible={isModal}
          title="Add column:"
          content={<AddColumn setModal={setModal} setnumOfColumns={setnumOfColumns} />}
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
};

export { OpenedBoard };
