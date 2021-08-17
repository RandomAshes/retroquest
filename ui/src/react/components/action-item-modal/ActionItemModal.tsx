/*
 * Copyright (c) 2021 Ford Motor Company
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';

import ActionItem from '../action-item/ActionItem';
import Modal, { ModalMethods } from '../modal/Modal';
import Action from '../../types/Action';

import './ActionItemModal.scss';

type ActionItemModalProps = {
  action: Action;
  readOnly?: boolean;
  onEdit?: (message: string) => void;
  onAssign?: (assignee: string) => void;
  onDelete?: () => void;
  onComplete?: () => void;
};

function ActionItemModal(props: ActionItemModalProps, ref: React.Ref<ModalMethods>) {
  const { action, readOnly, onEdit, onAssign, onDelete, onComplete } = props;

  return (
    <Modal ref={ref} className="action-item-modal">
      <ActionItem
        action={action}
        readOnly={readOnly}
        onEdit={onEdit}
        onAssign={onAssign}
        onDelete={onDelete}
        onComplete={onComplete}
      />
    </Modal>
  );
}

export default React.forwardRef<ModalMethods, ActionItemModalProps>(ActionItemModal);
