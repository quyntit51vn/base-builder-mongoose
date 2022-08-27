export type IColumns<T> = (keyof T)[];

type valueSchema = {
    type: 
}

export type typeSchema<T> = {
    [key in keyof T]: 
}

export interface IPaginate {
    page: number,
    limit: number
}

type TypeOrder = 1 | -1;
export type IOrder<T> = {
    [K in keyof T]?: TypeOrder
}
type Op = "$eq" | "$neq" | "$lt" | "$lte" | "$gt" | "$gte";
type OpArray = "$in" | "$nin";
type MultipleOp = "$and" | "$or";

type SingleOperator<T> = {
    [key in keyof T]?: {
        [op in Op]?: T[key]
    }
};

type SingleArrayOperator<T> = {
    [key in keyof T]?: {
        [op in OpArray]?: T[key][]
    }
};

interface SpecialOperfator<T> {
    $like: T extends string ? string : never;
    $regex?: T extends string ? RegExp | string : never;
    $exists?: boolean;
}

type MultipleOperator<T> = {
    [key in MultipleOp]?: (SingleOperator<T> | SingleArrayOperator<T> | SpecialOperfator<T> | MultipleOperator<T>)[];
};

export type QueryCondition<T> = SingleOperator<T> | SingleArrayOperator<T> | SpecialOperfator<T> | MultipleOperator<T>;

export IAtribute
