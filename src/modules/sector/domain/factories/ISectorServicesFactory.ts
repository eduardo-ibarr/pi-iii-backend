import {
  ICreateSectorService,
  IListSectorsService,
  IShowSectorService,
  IDeleteSectorService,
  IUpdateSectorService,
} from '../services';

export interface ISectorServicesFactory {
  createSectorService(): ICreateSectorService;
  listSectorsService(): IListSectorsService;
  showSectorService(): IShowSectorService;
  deleteSectorService(): IDeleteSectorService;
  updateSectorService(): IUpdateSectorService;
}
