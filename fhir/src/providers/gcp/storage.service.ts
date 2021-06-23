import { healthcare_v1 } from 'googleapis';
import { IStorageService } from '../../interfaces/storage.service.interface';
import { GcpHelper } from './helper.gcp';

////////////////////////////////////////////////////////////////////////////////

export class GcpStorageService implements IStorageService {


    //#region public methods

    public init = async (): Promise<boolean> => {
        try {

            var datasets = await this.getDatasetList();
            var defaultDataset = this.findDefaultDataset(datasets);
            if (defaultDataset == null) {
                defaultDataset = await this.createDataset();
            }
            console.log('Verified default dataset...');

            var fhirStores = await this.getFhirStoreList();
            var defaultFhirStore = this.findDefaultFhirStore(fhirStores);
            if (defaultFhirStore == null) {
                defaultFhirStore = await this.createFhirStore();
            }
            console.log('Verified default fhir-store...');

            var dicomStores = await this.getDicomStoreList();
            var defaultDicomStore = this.findDefaultDicomStore(dicomStores);
            if (defaultDicomStore == null) {
                defaultDicomStore = await this.createDicomStore();
            }
            console.log('Verified default dicom-store...');

            //var metadata = await this.getDefaultFhirStoreMetadata();
            //console.log(JSON.stringify(metadata, null, 2));

            return true;

        } catch (error) {
            console.log(
                'Error initializing GCP dataset/fhir-store. Error: ' +
                    error.message
            );
        }
    };

    //#endregion

    //#region Private methods

    private createDataset = async () => {

        var g = await GcpHelper.getGcpClient();
        const c = GcpHelper.getGcpFhirConfig();
        var parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}`;
        var datasetId: string = c.DatasetId;
        var create_dataset_request = { parent, datasetId };
        await g.projects.locations.datasets.create(
            create_dataset_request
        );
        parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}`;
        var get_dataset_request = { name: parent };
        const dataset = await g.projects.locations.datasets.get(
            get_dataset_request
        );
        //console.log(dataset.data);
        return dataset.data;
    };

    private createFhirStore = async () => {
        try {
            var g = await GcpHelper.getGcpClient();
            const c = GcpHelper.getGcpFhirConfig();
            var parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}`;
            var fhirStoreId: string = c.FhirStoreId;
            var version: string = c.FhirVersion;
            var create_store_request = {
                parent,
                fhirStoreId,
                resource: {
                    version,
                },
            };
            await g.projects.locations.datasets.fhirStores.create(
                create_store_request
            );

            parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/fhirStores/${c.FhirStoreId}`;
            var request = { name: parent };
            const store = await g.projects.locations.datasets.fhirStores.get(
                request
            );
            //console.log(store.data);
            return store.data;
        } catch (error) {
            throw error;
        }
    };

    private createDicomStore = async () => {
        try {
            var g = await GcpHelper.getGcpClient();
            const c = GcpHelper.getGcpFhirConfig();
            var parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}`;
            var dicomStoreId: string = c.DicomStoreId;
            var create_store_request = {
                parent,
                dicomStoreId
            };
            await g.projects.locations.datasets.dicomStores.create(
                create_store_request
            );

            parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/dicomStores/${c.DicomStoreId}`;
            var request = { name: parent };
            const store = await g.projects.locations.datasets.dicomStores.get(
                request
            );
            //console.log(store.data);
            return store.data;
        } catch (error) {
            throw error;
        }
    };

    private getDefaultDataset = async () => {
        try {
            var g = await GcpHelper.getGcpClient();
            const c = GcpHelper.getGcpFhirConfig();
            const parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}`;
            const request = { name: parent };
            const dataset = await g.projects.locations.datasets.get(
                request
            );
            //console.log(dataset.data);
            return dataset.data;
        } catch (error) {
            console.log(error.message);
            return null;
        }
    };

    private getDefaultFhirStore = async () => {
        var g = await GcpHelper.getGcpClient();
        const c = GcpHelper.getGcpFhirConfig();
        var parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/fhirStores/${c.FhirStoreId}`;
        const store = await g.projects.locations.datasets.fhirStores.get(
            { name: parent }
        );
        //console.log(store.data);
        return store.data;
    };

    private getDefaultDicomStore = async () => {
        var g = await GcpHelper.getGcpClient();
        const c = GcpHelper.getGcpFhirConfig();
        var parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/dicomStores/${c.DicomStoreId}`;
        const store = await g.projects.locations.datasets.dicomStores.get(
            { name: parent }
        );
        //console.log(store.data);
        return store.data;
    };

    private getDatasetList = async () => {
        try {
            var g = await GcpHelper.getGcpClient();
            const c = GcpHelper.getGcpFhirConfig();
            const parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}`;
            const request = { parent };
            const datasets = await g.projects.locations.datasets.list(
                request
            );
            //console.log(datasets);
            return datasets;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    private getFhirStoreList = async () => {
        try {
            var g = await GcpHelper.getGcpClient();
            const c = GcpHelper.getGcpFhirConfig();
            const parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}`;
            const request = { parent };
            const stores = await g.projects.locations.datasets.fhirStores.list(
                request
            );
            //console.log(stores);
            return stores;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    private getDicomStoreList = async () => {
        try {
            var g = await GcpHelper.getGcpClient();
            const c = GcpHelper.getGcpFhirConfig();
            const parent = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}`;
            const request = { parent };
            const stores = await g.projects.locations.datasets.dicomStores.list(
                request
            );
            //console.log(stores);
            return stores;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    private findDefaultDataset = (datasets) => {
        const c = GcpHelper.getGcpFhirConfig();
        const datasetPath = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}`;
        if (datasets.data.datasets && datasets.data.datasets.length > 0) {
            for (var d of datasets.data.datasets) {
                if (d.name === datasetPath) {
                    return d;
                }
            }
        }
        return null;
    };

    private findDefaultFhirStore = (stores) => {
        const c = GcpHelper.getGcpFhirConfig();
        const storePath = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/fhirStores/${c.FhirStoreId}`;
        if (stores.data.fhirStores && stores.data.fhirStores.length > 0) {
            for (var s of stores.data.fhirStores) {
                if (s.name === storePath) {
                    return s;
                }
            }
        }
        return null;
    };

    private findDefaultDicomStore = (stores) => {
        const c = GcpHelper.getGcpFhirConfig();
        const storePath = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/dicomStores/${c.DicomStoreId}`;
        if (stores.data.dicomStores && stores.data.dicomStores.length > 0) {
            for (var s of stores.data.dicomStores) {
                if (s.name === storePath) {
                    return s;
                }
            }
        }
        return null;
    };

    private getDefaultFhirStoreMetadata = async () => {
        var g = await GcpHelper.getGcpClient();
        const c = GcpHelper.getGcpFhirConfig();
        const name = `projects/${c.ProjectId}/locations/${c.CloudRegion}/datasets/${c.DatasetId}/fhirStores/${c.FhirStoreId}/fhir/metadata`;
        const request = { name };
        const fhirStore =
            await g.projects.locations.datasets.fhirStores.get(
                request
            );
        //console.log(JSON.stringify(fhirStore.data, null, 2));
        return fhirStore.data;
    }

    //#endregion

}
