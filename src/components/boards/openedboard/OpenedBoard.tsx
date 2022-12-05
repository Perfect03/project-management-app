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
import { Reorder } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IToastStatus } from 'interfaces/toast';

const OpenedBoard = () => {
  const [isModal, setModal] = useState(false);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [currentColumn, setCurrentColumn] = useState(columns[0]);
  const isRerender = useSelector<IGetState>((state) => state.selectedBoard.isLoading) as boolean;
  const params = useParams();
  const currentBoard = params.id as string;

  const { t } = useTranslation();

  const toastPromise = (status: IToastStatus) => {
    if (status == 'off') toast['error'](t('Connection error'));
  };

  useEffect(() => {
    const getColumns = async () => {
      try {const currentColumns = await ColumnApi.getColumnsInBoard(currentBoard);
      setColumns(currentColumns);}
      catch (error) {
        if (!((error as AxiosError).response?.status)) toastPromise('off');
      }
    };
    getColumns();
  }, [isRerender]);

  function dragStartHandler(e: React.DragEvent<HTMLElement>, card: IColumn) {
    setCurrentColumn(card);
  }

  function dragEndHandler(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
  }

  async function dropHandler(e: React.DragEvent<HTMLElement>, card: IColumn) {
    e.preventDefault();
    const newColumns = columns.map((e) => {
      if (e._id === card._id) {
        return { ...e, order: currentColumn.order };
      }
      if (e._id === currentColumn._id) {
        return { ...e, order: card.order };
      }
      return e;
    });
    setColumns(newColumns);
    await ColumnApi.updateColumnsSet(
      newColumns.map((e) => {
        if (e._id === card._id) {
          return { _id: e._id as string, order: currentColumn.order };
        }
        if (e._id === currentColumn._id) {
          return { _id: e._id as string, order: card.order };
        }
        return { _id: e._id as string, order: e.order };
      })
    );
  }

  function dragOverHandler(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
  }

  const sortColumns = (a: IColumn, b: IColumn) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <>
      <section className="columns">
        <Reorder.Group axis="x" className="columns-table" values={columns} onReorder={setColumns}>
          {columns.sort(sortColumns).map((values) => {
            return (
              <NewColumn
                columnData={values}
                columnDragStartHandler={dragStartHandler}
                columnDragEndHandler={dragEndHandler}
                columnDragOverHandler={dragOverHandler}
                columnDropHandler={dropHandler}
                key={values._id}
              />
            );
          })}
          <li>
            <button className="columns-table__add" onClick={() => setModal(true)}>
              {t('Add new column')} +
            </button>
          </li>
        </Reorder.Group>
      </section>
      {isModal && (
        <Modal
          isVisible={isModal}
          title={t('Add column:')}
          content={<AddColumn setModal={setModal} />}
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
};

export { OpenedBoard };
