/* eslint-disable import/prefer-default-export */

// application
import { clone } from '~/fake-server/utils';
import { ICountry } from '~/interfaces/country';

const countries: ICountry[] = [{ code: 'AU', name: 'Australia' }];

export function getCountries(): Promise<ICountry[]> {
    return Promise.resolve(clone(countries));
}
