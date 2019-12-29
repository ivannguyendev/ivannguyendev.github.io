import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {map as _map, fromPairs as _fromPairs} from 'lodash';

@bind({scope: BindingScope.SINGLETON})
export class UtilsDomainService {
	constructor(/* Add @inject to inject parameters */) {}

	/*
	 * Add service methods here
	 */
	object2kv(source: object): Array<any> {
		return _map(source, (value, key) => ({key, value}));
	}

	kv2object(source: Array<{key: string; value: any}>): object {
		return _fromPairs(_map(source, i => [i.key, i.value]));
	}
	slugify(alias: string) {
		let str = alias;
		str = str.toLowerCase();
		str = str.replace(/à|á|ạ|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ắ|ặ|ẳ|ẵ/g, 'a');
		str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
		str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
		str = str.replace(/ò|ó|ọ|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ớ|ợ|ở|ỡ/g, 'o');
		str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
		str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
		str = str.replace(/đ/g, 'd');
		str = str.replace(
			/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
			'-',
		);
		/* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
		str = str.replace(/-+-/g, '-'); //thay thế 2- thành 1-
		str = str.replace(/^\-+|\-+$/g, '');
		//cắt bỏ ký tự - ở đầu và cuối chuỗi
		return str;
	}
	stringAscii(alias: string) {
		var str = alias;
		str = str.toLowerCase();
		str = str.replace(/à|á|ạ|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ắ|ặ|ẳ|ẵ/g, 'a');
		str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
		str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
		str = str.replace(/ò|ó|ọ|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ớ|ợ|ở|ỡ/g, 'o');
		str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
		str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
		str = str.replace(/đ/g, 'd');
		/* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
		str = str.replace(/-+-/g, '-'); //thay thế 2- thành 1-
		str = str.replace(/^\-+|\-+$/g, '');
		//cắt bỏ ký tự - ở đầu và cuối chuỗi
		return str;
	}
}
