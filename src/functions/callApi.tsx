
interface ResponseCallApi {
    items: object[],
    total_count: number,
}
interface PropsCallApi {
    setRateLimitReach: React.Dispatch<React.SetStateAction<boolean>>,
    setIsoLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setProfiles: React.Dispatch<React.SetStateAction<object[] | null>>,
    setNoResult: React.Dispatch<React.SetStateAction<boolean>>,
    userSearch: string
}
export async function callApi({ setRateLimitReach, setIsoLoading, setProfiles, setNoResult, userSearch }: PropsCallApi) {
    try {
        const response = await fetch(`https://api.github.com/search/users?q=${userSearch}`);
        if (response.status === 403) {
            setRateLimitReach(true)
            setIsoLoading(false)
            return
        }
        const allProfiles: ResponseCallApi = await response.json()
        const profilesInArray: object[] = allProfiles.items
        if (allProfiles.total_count === 0) {
            setProfiles(null);
            setNoResult(true)
            setIsoLoading(false)
            return
        }
        if (allProfiles.total_count > 0) {
            setProfiles(profilesInArray);
            setIsoLoading(false)
            return
        }
    }
    catch (e) {
        console.log(e)
        setIsoLoading(false)
        return
    }
}