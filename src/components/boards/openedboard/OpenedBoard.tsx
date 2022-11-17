import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IColumn } from 'interfaces/api';
import { NewColumn } from '../columns/new-column';
import './openedboard.scss';
import { Modal } from 'components/modal/Modal';
import { AddColumn } from '../columns/addcolumn';

export const columnStore = [] as Array<IColumn>;

const OpenedBoard = () => {
  const [isModal, setModal] = useState(false);
  const { id } = useParams();
  return (
    <>
      <section className="columns">
        <ul className="columns-table">
          {columnStore.map((values) => {
            return <NewColumn values={values} key={columnStore.indexOf(values)} />;
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
