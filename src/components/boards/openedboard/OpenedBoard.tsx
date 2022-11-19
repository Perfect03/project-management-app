import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NewColumn } from '../columns/new-column';
import './openedboard.scss';
import { Modal } from 'components/modal/Modal';
import { AddColumn } from '../columns/addcolumn';
import ColumnApi from '../../../api/columns';

const OpenedBoard = () => {
  const [isModal, setModal] = useState(false);
  const params = useParams();
  const current = params.id as string;
  const [isColumn, setColumn] = useState([]);

  useEffect(() => {
    const getColumn = async () => {
      const column = await ColumnApi.getColumnsInBoard(current);
      setColumn(column);
    };
    getColumn();
    return () => {};
  }, [current]);

  return (
    <>
      <section className="columns">
        <ul className="columns-table">
          {isColumn.map((values) => {
            return <NewColumn values={values} key={isColumn.indexOf(values)} />;
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
          content={<AddColumn setModal={setModal} />}
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
};

export { OpenedBoard };
