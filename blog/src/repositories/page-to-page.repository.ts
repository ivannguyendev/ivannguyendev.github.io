import {DefaultCrudRepository} from '@loopback/repository';
// import {PageToPage, PageToPageRelations} from '@app/models';
import {DbDataSource} from '@app/datasources';
import {inject} from '@loopback/core';

interface IPageToPageRepository {}

// export class PageToPageRepository
// 	extends DefaultCrudRepository<PageToPage, typeof PageToPage.prototype.id, PageToPageRelations>
// 	implements IPageToPageRepository {
// 	constructor(@inject('datasources.db') dataSource: DbDataSource) {
// 		super(PageToPage, dataSource);
// 	}
// }
