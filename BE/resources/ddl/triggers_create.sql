create function process_achievement_ratings() returns trigger
    language plpgsql
as
$$
DECLARE
    query_result RECORD;
    text_value TEXT;
    id_value INTEGER;
    achiv_name_value TEXT;
    execution_result BOOLEAN;
    profile_id_value INTEGER;
    json_value text;
BEGIN
    Select id from profiles where ranking_id = new.id into profile_id_value;
    FOR query_result IN SELECT query_text, id, achiv_name FROM achievement WHERE active = false AND profile_id = profile_id_value LOOP
        text_value := query_result.query_text;
        id_value := query_result.id;
        achiv_name_value := query_result.achiv_name;

        EXECUTE text_value INTO execution_result;
        IF execution_result THEN
            UPDATE achievement SET active = true,acquired=now() WHERE profile_id = profile_id_value AND id = id_value;
            UPDATE profiles SET experience = experience + 100 where id = profile_id_value;
            json_value := '{"message": ' ||
              '"Gratulacje, zdobyto osiągnięcie o nazwie ' || achiv_name_value ||
              '. Sprawdź swoje konto aby sprawdzić jego znaczenie",' ||
              '"profileId": ' || profile_id_value || '}';

            PERFORM send_post_request('http://74.234.50.115:8081/api/v1/system_info',json_value);
        END IF;
    END LOOP;
    RETURN NULL;
END;
$$;

alter function process_achievement_ratings() owner to postgres;

create function process_achievement() returns trigger
    language plpgsql
as
$$
DECLARE
    query_result RECORD;
    text_value TEXT;
    id_value INTEGER;
    achiv_name_value TEXT;
    execution_result BOOLEAN;
    json_value text;
BEGIN
    FOR query_result IN SELECT query_text, id, achiv_name FROM achievement WHERE active = false AND profile_id = new.profile_id LOOP
        text_value := query_result.query_text;
        id_value := query_result.id;
        achiv_name_value := query_result.achiv_name;

        
        EXECUTE text_value INTO execution_result;
        IF execution_result THEN
            UPDATE achievement SET active = true,acquired=now() WHERE profile_id = new.profile_id AND id = id_value;
            UPDATE profiles SET experience = experience + 100 where id = new.profile_id;
            json_value := '{"message": ' ||
              '"Gratulacje, zdobyto osiągnięcie o nazwie ' || achiv_name_value ||
              '. Sprawdź swoje konto aby sprawdzić jego znaczenie",' ||
              '"profileId": ' || new.profile_id || '}';

            PERFORM send_post_request('http://74.234.50.115:8081/api/v1/system_info',json_value);
        END IF;
    END LOOP;
    RETURN NULL;
END;
$$;

alter function process_achievement() owner to postgres;

create function process_experience() returns trigger
    language plpgsql
as
$$
DECLARE
    exp integer;
BEGIN
    Select experience from profiles where id = new.id into exp;
    if exp >= 100 then
        UPDATE profiles SET experience = exp - 100, level = level +1 where id = new.id;
    end if;
    RETURN NULL;
END;
$$;

alter function process_experience() owner to postgres;

CREATE OR REPLACE FUNCTION send_post_request(url text, body text)
RETURNS text AS $$
import urllib.request
import json
try:
    data = body.encode('utf-8')
    req = urllib.request.Request(url, data=data, method='POST')
    req.add_header('Content-Type', 'application/json')
    req.add_header('APP-TOKEN','9d68e6b5-64b5-4b13-b1c9-b2677f78f33f')
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        return content
except Exception as e:
    return 'Error: ' + str(e)
$$ LANGUAGE plpython3u;


create trigger process_achievement_trigger
    after insert
    on bets
    for each row
execute procedure process_achievement();


create trigger process_achievement_trigger
    after insert
    on achievement
    for each row
execute procedure process_achievement();

create trigger process_achievement_trigger
    after insert or update
    on ratings
    for each row
execute procedure process_achievement_ratings();

create trigger process_experience_trigger
    after update
    on profiles
    for each row
execute procedure process_experience();