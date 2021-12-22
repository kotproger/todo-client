export interface ResponseHttp<T> {
    status: boolean;
    errors: string[];
    data? : T
}