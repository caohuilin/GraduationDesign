import * as Immutable from 'immutable';

// allBookList Type
const IAllBookListItemRecord = Immutable.Record({
    id: String,
    name: String,
    author: String,
    category: String,
    picture: String,
    introduce: String,
    view: Number,
});
class IAllBookListItem extends IAllBookListItemRecord {
    id: 0;
    name: '';
    author: '';
    category: '';
    picture: '';
    introduce: '';
    view: 0;
}
const IAllBookListRecord = Immutable.Record({
    list: Immutable.List([])
});
export class IAllBookList extends IAllBookListRecord {
    list: Immutable.List<IAllBookListItem>;
}

export class ISearchBookList extends IAllBookListRecord {
    list: Immutable.List<IAllBookListItem>;
};

export class ICollectBookList extends IAllBookListRecord {
    list: Immutable.List<IAllBookListItem>;
};

export class IRecommendBookList extends IAllBookListRecord {
    list: Immutable.List<IAllBookListItem>;
};



// allCategory Type
const IAllCategoryItemRecord = Immutable.Record({
    id: String,
    category: String,
});
class IAllCategoryItem extends IAllCategoryItemRecord {
    id: '';
    category: '';
}
const IAllCategoryRecord = Immutable.Record({
    list: Immutable.List([])
});
export class IAllCategory extends IAllCategoryRecord {
    list: Immutable.List<IAllCategoryItem>;
}

// bookInfo Type
const IBookInfoContentCatalogueItemRecord = Immutable.Record({
    id: String,
    chapter: String,
});
const IBookInfoContentRecord = Immutable.Record({
    id: String,
    name: String,
    picture: String,
    author: String,
    description: String,
    category: String,
    catalogue: Immutable.List<IBookInfoContentCatalogueItem>()
});
const IBookInfoRecord = Immutable.Record({
    content: Immutable.Map({}),
});

class IBookInfoContentCatalogueItem extends IBookInfoContentCatalogueItemRecord {
    id: '';
    chapter: '';
}
class IBookInfoContent extends IBookInfoContentRecord {
    id: '';
    name: '';
    picture: '';
    author: '';
    description: '';
    category: '';
    catalogue: Immutable.List<IBookInfoContentCatalogueItem>;
}
export class IBookInfo extends IBookInfoRecord {
    content: IBookInfoContent;
}

// content Type
const IContentRecord = Immutable.Record({
    content: Immutable.List<string>(),
    everyWidth: 0,
    page: 0,
});
export class IContent extends IContentRecord {
    content: Immutable.List<string>;
    everyWidth: number;
    page: number;
}

// routing Type
export interface IRouter {
    locationBeforeTransitions: {
        pathname: string,
        search: string,
    };
}

const IBrightRecord = Immutable.Record({
    left: 186,
    night: false,
});

export class IBright extends IBrightRecord {
    left: number;
    night: boolean;

}

const IFontRecord = Immutable.Record({
    fontSize: 16,
});

export class IFont extends IFontRecord {
    fontSize: number;
}

const IAuthRecord = Immutable.Record({
    login: Immutable.Map({
        data: null,
        error: null
    }),
    register: Immutable.Map({
        data: null,
        error: null,
    }),
});

export class IAuth extends IAuthRecord {
    login: any;
    register: any;
}
const IAccountRecord = Immutable.Record({
    data: null,
});
export class IAccount extends IAccountRecord {
    data: any;
}

const IUserStatusRecord = Immutable.Record({
    data: null,
});
export class IUserStatus extends IUserStatusRecord {
    data: any;
}
