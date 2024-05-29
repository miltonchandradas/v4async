namespace demo;

using {cuid} from '@sap/cds/common';

entity ActionStatus : cuid {
    actionId : Integer;
    status   : String;
}
