import React, { useState } from 'react';
import { NewColumn } from '../columns/new-column';
import './openedboard.scss';
import { Modal } from 'components/modal/Modal';
import { AddColumn } from '../columns/addcolumn';
import { IGetState } from 'interfaces/redux';
import { useSelector } from 'react-redux';
import { IColumn } from 'interfaces/api';

const OpenedBoard = () => {
  const [isModal, setModal] = useState(false);

  const columnStore = useSelector<IGetState>(
    (state) => state.selectedBoard.columns
  ) as unknown as IColumn[];

  return (
    <>
      <section className="columns">
        <ul className="columns-table">
          {columnStore.map((values) => {
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
          content={<AddColumn setModal={setModal} />}
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
};

export { OpenedBoard };
