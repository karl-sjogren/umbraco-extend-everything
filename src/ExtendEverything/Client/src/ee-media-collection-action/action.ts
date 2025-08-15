import { UmbCollectionActionBase } from '@umbraco-cms/backoffice/collection';

class ExtendEverythingMediaCollectionAction extends UmbCollectionActionBase {
	async execute() {
    alert("Executing custom media creation action!");
	}
}

export { ExtendEverythingMediaCollectionAction as api };
