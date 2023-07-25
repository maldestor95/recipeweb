import constants from './constants.ts'
import YAML from 'yaml'
export type recipeListType = { title: string; link: string }[];

const fetchList = async (): Promise<recipeListType> => {

    const url = `${constants.RecipePath()}/recipelist.yml`;
    console.log(url)
    const myHeaders = new Headers();
    const myInit: Partial<RequestInit> = {
        method: 'GET',
        headers: myHeaders,
        mode: "cors",
        cache: 'default',
    };

    const query = await fetch(url, myInit)

    return YAML.parse(await query.text())
}
const fetchRecipe = async (link: string): Promise<string> => {

    const url = `${constants.RecipePath()}/${link}`;
    console.log(url)
    const myHeaders = new Headers();
    const myInit: Partial<RequestInit> = {
        method: 'GET',
        headers: myHeaders,
        mode: "cors",
        cache: 'default',
    };

    const query = await fetch(url, myInit)

    return await query.text()
}

export default { fetchList, fetchRecipe }