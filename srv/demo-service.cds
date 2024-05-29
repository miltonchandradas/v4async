using {demo} from '../db/schema';

@path : 'service/demo'
service DemoService {
    entity ActionStatus as select from demo.ActionStatus;

    action v4asyncAction(ID: String) returns String;

}
