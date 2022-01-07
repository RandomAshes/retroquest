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

import { Subject } from 'rxjs';

import { DataService } from '../../../data.service';
import { Board, emptyBoardWithThought } from '../../../domain/board';
import { ActionItemService } from '../../services/action.service';
import { BoardService } from '../../services/board.service';
import { TeamService } from '../../services/team.service';

import { ArchivesPageComponent } from './archives.page';

describe('ArchivesPageComponent', () => {
  let fetchTeamNameSubject: Subject<string>;
  let fetchBoardsSubject: Subject<Array<Board>>;

  let mockTeamService: TeamService;
  let mockBoardService: BoardService;
  let mockWindow: Window;
  let mockDataService: DataService;
  let mockActionItemService: ActionItemService;

  let component: ArchivesPageComponent;

  beforeEach(() => {
    fetchTeamNameSubject = new Subject();
    fetchBoardsSubject = new Subject();

    mockTeamService = {
      fetchTeamName: jest.fn().mockReturnValue(fetchTeamNameSubject),
    } as unknown as TeamService;

    mockBoardService = {
      fetchBoards: jest.fn().mockReturnValue(fetchBoardsSubject),
    } as unknown as BoardService;

    mockWindow = {
      clearInterval: jest.fn(),
    } as unknown as Window;

    mockDataService = new DataService();

    mockActionItemService = {
      fetchArchivedActionItems: jest.fn().mockReturnValue(new Subject()),
    } as unknown as ActionItemService;

    component = new ArchivesPageComponent(mockDataService, mockTeamService, mockBoardService, mockActionItemService);
    component.globalWindowRef = mockWindow;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`ngOnInit`, () => {
    beforeEach(() => {
      mockDataService.team.name = 'the team name';
      mockDataService.team.id = 'the id';
    });

    it('should have the archives loading flag to true', () => {
      expect(component.thoughtArchivesAreLoading).toBeTruthy();
    });

    it('should set the team id attribute on the component', () => {
      component.teamId = '';
      component.ngOnInit();
      expect(component.teamId).toEqual('the id');
    });

    it(`should set the teamName attribute on the component`, () => {
      component.teamName = '';
      component.ngOnInit();
      expect(component.teamName).toEqual('the team name');
    });

    it('should get all of the archived action items', () => {
      component.ngOnInit();
      expect(mockActionItemService.fetchArchivedActionItems).toHaveBeenCalled();
    });
  });

  describe('removeBoardFromBoard', () => {
    it('should remove a board given a boardId', () => {
      const board1 = emptyBoardWithThought();
      board1.id = 1;
      const board2 = emptyBoardWithThought();
      board2.id = 2;
      component.boards = [board1, board2];
      component.removeBoardFromBoards(1);
      expect(component.boards).not.toContain(board1);
    });
  });

  describe('onScroll', () => {
    const teamId = 'test-team-id';

    beforeEach(() => {
      component.teamId = teamId;
      component.boardPageIndex = 0;
      component.onScroll();
    });

    it('should fetch the next paged board from the api, with a page index incremented by 1', () => {
      expect(mockBoardService.fetchBoards).toHaveBeenCalledWith(teamId, 1);
    });
  });
});
