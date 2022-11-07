import { IFilterData } from "../../../store/filterStore";

export interface IFilterSettingTypeProp {
    setFilterData: (data: IFilterData) => void;
}